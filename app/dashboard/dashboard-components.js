'use strict';

angular.module('myApp.dashboard')

.component('dashboard', {
  templateUrl: 'dashboard/partials/dashboard.html'
})

.component('dashboardHeader', {
  templateUrl: 'dashboard/partials/header.html',
  controller: function(ConfigService, ConfirmationModalService, $state) {
    this.config = ConfigService.config;
    this.isNavCollapsed = true;

    this.logout = function() {
      ConfirmationModalService.open({
        message: 'Are you sure you want to logout?',
        confirmButtonMessage: 'Yes',
        cancelButtonMessage: 'No'
      }).result.then(function() {
        $state.go('logout');
      });
    }
  }
})

.component('dashboardSidebar', {
  templateUrl: 'dashboard/partials/sidebar.html',
  controller: function() {
    this.isNavCollapsed = true;
  }
})

.component('dashboardIndex', {
  templateUrl: 'dashboard/partials/index.html'
})

.component('dashboardUsersPage', {
  bindings: {
    users: '<'
  },
  templateUrl: 'dashboard/partials/users-page.html',
  controller: function(AlertService, ALERT_TYPES, $uibModal) {
    this.searchTerm = '';

    this.deleteUser = function(user) {
      AlertService.newAlert({
        'type': ALERT_TYPES.warning,
        'message': 'User ' + user.username + ' successfully deleted.'
      });
      let userIndex = this.users.indexOf(user);
      this.users.splice(userIndex,1);
    };

    this.addUser = function() {
      let modalInstance = $uibModal.open({
        component: 'dashboardUserAddModal',
        windowClass: 'dashboard-user-add-modal',
        backdrop: 'static'
      });

      modalInstance.result.then(angular.bind(this, function(user) {
        AlertService.newAlert({
          'type': ALERT_TYPES.warning,
          'message': 'User ' + user.username + ' successfully added.'
        });
        this.users.push(user);
      }));
    };

    this.actions = [{
			'text': 'Add user',
			'class': 'add-user',
			'click': angular.bind(this, this.addUser)
		}];
  }
})

.component('dashboardUserItem', {
  bindings: {
    user: '<'
  },
  templateUrl: 'dashboard/partials/user-item.html',
  require: {
    parent: '^dashboardUsersPage'
  },
  controller: function(ConfirmationModalService, $uibModal, BackendService, AlertService, ALERT_TYPES) {
    this.delete = function() {
      ConfirmationModalService.open({
        message: 'Are you sure you want to delete user \'' + this.user.username + '\'?',
        confirmButtonMessage: 'Yes',
        cancelButtonMessage: 'No'
      }).result.then(angular.bind(this,function() {
        BackendService.getDashboardUserResource().delete({userId: this.user.id}).$promise.then(
          angular.bind(this,function(value) {
            this.parent.deleteUser(this.user);
          })
        );
      }));
    }

    this.edit = function() {
      let modalInstance = $uibModal.open({
				component: 'dashboardUserEditModal',
				resolve: {
					user: this.user
				},
        backdrop: 'static',
				windowClass: 'dashboard-user-edit-modal'
			});

			modalInstance.result.then(angular.bind(this,function(user) {
				this.user = user;
        AlertService.newAlert({
          'type': ALERT_TYPES.warning,
          'message': 'User ' + user.username + ' successfully edited.'
        });
			}));
    }
  }
})

.component('dashboardUserAddModal', {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'dashboard/partials/user-add-modal.html',
  controller: function(BackendService) {
    this.formData = {
      'username': '',
      'email': '',
      'password': ''
    }
    this.check = {
      'email': '',
      'password': ''
    }
    this.roles = {
      'admin': false,
      'poweruser': false
    }

    this.loading = false;

    this.save = function(data) {
      this.loading = true;
      BackendService.getDashboardUserResource().save(data).$promise.then(angular.bind(this,function(value) {
        angular.forEach(this.roles, angular.bind(this, function(roleValue, roleKey) {
          if (roleValue) {
            BackendService.addRoleToUser(value.id, roleKey).then(angular.bind(this, function() {
              value.roles.push(roleKey);
            }));
          }
        }))
        this.loading = false;
        this.close({$value: value});
      }), angular.bind(this, function() {
        this.loading = false;
      }));
    };
  }
})

.component('dashboardUserEditModal', {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'dashboard/partials/user-edit-modal.html',
  controller: function(BackendService) {
    this.user = this.resolve.user;
    this.formData = {
      'username': this.user.username,
      'email': this.user.email,
      'password': '',
      'roles': {
        'admin': (this.user.roles.indexOf('admin') !== -1),
        'poweruser': (this.user.roles.indexOf('poweruser') !== -1)
      }
    }
    this.check = {
      'email': '',
      'password': ''
    }

    this.loading = false;

    this.save = function(data) {
      this.loading = true;
      let sendData = {};
      if (data.username != this.user.username) {
        sendData.username = data.username;
      }
      if (data.email != this.user.email) {
        sendData.email = data.email;
      }
      if (data.password != '') {
        sendData.password = data.password;
      }
      angular.forEach(data.roles, angular.bind(this, function (value, key) {
        if (value && this.user.roles.indexOf(key) == -1) {
          BackendService.addRoleToUser(this.user.id,key).then(angular.bind(this, function() {
            this.user.roles.push(key);
          }));
        }
        if (!value && this.user.roles.indexOf(key) !== -1) {
          BackendService.delRoleToUser(this.user.id,key).then(angular.bind(this, function() {
            this.user.roles.splice(this.user.roles.indexOf(key), 1);
          }));
        }
      }));
      if (sendData.length === 0) {
        this.loading = false;
        this.close({$value: this.user});
      }
      BackendService.getDashboardUserResource().save({userId:this.user.id}, sendData).$promise.then(angular.bind(this, function() {
        this.loading = false;
        this.close({$value: angular.extend({},this.user, sendData)});
      }), angular.bind(this, function() {
        this.loading = false;
      }));
    }
  }
})

.component('dashboardAlbumsPage', {
  bindings: {
    albums: '<'
  },
  templateUrl: 'dashboard/partials/albums-page.html',
  controller: function() {
    this.searchTerm = '';
  }
})

.component('dashboardAlbumItem', {
  bindings: {
    album: '<'
  },
  templateUrl: 'dashboard/partials/album-item.html',
  controller: function($uibModal) {
    this.edit = function() {
      let modalInstance = $uibModal.open({
        component: 'dashboardAlbumEditModal',
        resolve: {
          album: this.album
        },
        windowClass: 'dashboard-album-edit-modal',
        size: 'lg'
      });

      modalInstance.result.then(angular.bind(this, function(album) {
        this.album = album;
        AlertService.newAlert({
          'type': ALERT_TYPES.warning,
          'message': 'Album \'' + album.path + '\' succesfully edited.'
        });
      }));
    };
  }
})

.component('dashboardAlbumPage', {
  bindings: {
    album: '<',
    children: '<',
    photos: '<'
  },
  templateUrl: 'dashboard/partials/album-page.html',
  controller: function($uibModal, AlertService, ALERT_TYPES) {
    this.searchTerm = '';

    this.edit = function() {
      let modalInstance = $uibModal.open({
        component: 'dashboardAlbumEditModal',
        resolve: {
          album: this.album
        },
        windowClass: 'dashboard-album-edit-modal',
        size: 'lg'
      });

      modalInstance.result.then(angular.bind(this, function(album) {
        this.album = album;
        AlertService.newAlert({
          'type': ALERT_TYPES.warning,
          'message': 'Album \'' + album.path + '\' succesfully edited.'
        });
      }));
    };

    this.actions = [{
      'text': 'Edit',
      'class': 'edit',
      'click': angular.bind(this, this.edit)
    }]
  }
})

.component('dashboardAlbumEditModal', {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'dashboard/partials/album-edit-modal.html',
  controller: function(BackendService) {
    this.album = this.resolve.album;

    this.formData = {
      'title': this.album.title,
      'description': this.album.description,
    }
    if (this.album.timestamp_from == null) {
      this.formData.timestamp_from = null;
    } else {
      this.formData.timestamp_from = new Date(this.album.timestamp_from);
    }
    if (this.album.timestamp_to == null) {
      this.formData.timestamp_to = null;
    } else {
      this.formData.timestamp_to = new Date(this.album.timestamp_to);
    }

    this.loading = false;

    this.isTimestampFromPickerOpened = false;
    this.isTimestampToPickerOpened = false;

    this.dateOptions = {
      formatYear: 'yy',
      showWeeks: false,
      startingDay: 1
    };

    this.openTimestampFromPicker = function() {
      this.isTimestampFromPickerOpened = true;
    };

    this.openTimestampToPicker = function() {
      this.isTimestampToPickerOpened = true;
    };

    this.save = function(data) {
      this.loading = true;
      let sendData = {};
      if (data.title != this.album.title) {
        sendData.title = data.title;
      }
      if (data.description != this.album.description) {
        sendData.description = data.description;
      }
      if (data.timestamp_from != this.album.timestamp_from) {
        sendData.timestamp_from = data.timestamp_from.toUTCString();
      }
      if (data.timestamp_to != this.album.timestamp_to) {
        sendData.timestamp_to = data.timestamp_to.toUTCString();
      }
      BackendService.getDashboardAlbumResource().save({albumId:this.album.id}, sendData).$promise.then(angular.bind(this,function() {
        this.loading = false;
        this.close({$value: angular.extend({},this.album,data)});
      }), angular.bind(this, function() {
        this.loading = false;
      }));
    };
  }
})

.component('dashboardPhotoItem', {
  bindings: {
    photo: '<',
    album: '<'
  },
  templateUrl: 'dashboard/partials/photo-item.html',
  controller: function($uibModal) {
    this.edit = function() {
      let modalInstance = $uibModal.open({
        component: 'dashboardPhotoEditModal',
        resolve: {
          photo: this.photo
        },
        windowClass: 'dashboard-photo-edit-modal',
        size: 'lg'
      });

      modalInstance.result.then(angular.bind(this, function(photo) {
        this.photo = photo;
        AlertService.newAlert({
          'type': ALERT_TYPES.warning,
          'message': 'Photo \'' + photo.path + '\' succesfully edited.'
        });
      }));
    };
  }
})

.component('dashboardPhotoEditModal', {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'dashboard/partials/photo-edit-modal.html',
  controller: function(BackendService) {
    this.photo = this.resolve.photo;

    this.formData = {
      'title': this.photo.title,
      'description': this.photo.description,
    }
    if (this.photo.timestamp == null) {
      this.formData.timestamp = null;
    } else {
      this.formData.timestamp = new Date(this.photo.timestamp);
    }

    this.loading = false;

    this.isTimestampPickerOpened = false;

    this.dateOptions = {
      formatYear: 'yy',
      showWeeks: false,
      startingDay: 1
    };

    this.openTimestampPicker = function() {
      this.isTimestampPickerOpened = true;
    };

    this.save = function(data) {
      this.loading = true;
      let sendData = {};
      if (data.title != this.photo.title) {
        sendData.title = data.title;
      }
      if (data.description != this.photo.description) {
        sendData.description = data.description;
      }
      if (data.timestamp != this.photo.timestamp) {
        sendData.timestamp = data.timestamp.toUTCString();
      }
      BackendService.getDashboardPhotoResource().save({photoId:this.photo.id}, sendData).$promise.then(angular.bind(this, function() {
        this.loading = false;
        this.close({$value: angular.extend({},this.photo,data)});
      }),angular.bind(this, function() {
        this.loading = false;
      }));
    };
  }
})

.component('dashboardPhotoPage', {
  bindings: {
    photo: '<',
  },
  templateUrl: 'dashboard/partials/photo-page.html',
  controller: function($uibModal, AlertService, ALERT_TYPES) {
    this.edit = function() {
      let modalInstance = $uibModal.open({
        component: 'dashboardPhotoEditModal',
        resolve: {
          photo: this.photo
        },
        windowClass: 'dashboard-photo-edit-modal',
        size: 'lg'
      });

      modalInstance.result.then(angular.bind(this, function(photo) {
        this.photo = photo;
        AlertService.newAlert({
          'type': ALERT_TYPES.warning,
          'message': 'Photo \'' + photo.path + '\' succesfully edited.'
        });
      }));
    };

    this.actions = [{
      'text': 'Edit',
      'class': 'edit',
      'click': angular.bind(this, this.edit)
    }];
  }
});
