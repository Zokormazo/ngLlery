'use strict';

angular.module('myApp.private')

.component('private', {
	templateUrl: 'private/partials/private.html'
})

.component('privateHeader', {
  templateUrl: 'private/partials/header.html',
  controller: function(AuthService, USER_ROLES, ConfigService, ConfirmationModalService, $state, $rootScope) {
  	this.config = ConfigService.config;
		this.currentUser = AuthService.getCurrentUser();
		this.isAuthorized = AuthService.isAuthorized;
		this.USER_ROLES = USER_ROLES;
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

.component('privateIndex', {
	templateUrl: 'private/partials/index.html'
})

.component('privateAlbumsPage', {
	bindings: {
		albums: '<'
	},
	templateUrl: 'private/partials/albums-page.html',
	controller: function() {
		this.searchTerm = '',
		this.filteredAlbums = [];
	}
})

.component('privateAlbumItem', {
	bindings: {
		album: '<'
	},
	templateUrl: 'private/partials/album-item.html'
})

.component('privateAlbumPage', {
	bindings: {
		album: '<',
		children: '<',
		photos: '<'
	},
	templateUrl: 'private/partials/album-page.html',
	controller: function() {
		this.searchTerm = '',
		this.filteredPhotos = [];
		this.filteredChildren = [];
	}
})

.component('privatePhotoItem', {
	bindings: {
		photo: '<',
		album: '<'
	},
	templateUrl: 'private/partials/photo-item.html'
})

.component('privatePhotoModal', {
	bindings: {
		photo: '<',
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	templateUrl: 'private/partials/photo-modal.html',
	controller: function() {
		this.photo = this.resolve.photo;
	}
})

.component('privateMembersPage', {
	bindings: {
		members: '<'
	},
	templateUrl: 'private/partials/members-page.html',
	controller: function() {
		this.searchTerm = '';
		this.filteredMembers = [];
	}
})

.component('privateMemberItem', {
	bindings: {
		member: '<'
	},
	templateUrl: 'private/partials/member-item.html'
})

.component('privateMemberModal', {
	bindings: {
		member: '<',
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	templateUrl: 'private/partials/member-modal.html',
	controller: function() {
		this.member = this.resolve.member;
	}
})

.component('privateProfilePage', {
	bindings: {
		profile: '<'
	},
	templateUrl: 'private/partials/profile-page.html',
	controller: function($uibModal, BackendService) {
		this.openEditModal = function() {
			let modalInstance = $uibModal.open({
				component: 'privateProfileEditModal',
				resolve: {
					profile: this.profile
				},
				windowClass: 'private-profile-edit-modal'
			});

			modalInstance.result.then(angular.bind(this,function(newProfile) {
				this.profile = newProfile;
			}));
		};

		this.actions = [{
			'text': 'Edit',
			'class': 'edit',
			'click': angular.bind(this, this.openEditModal)
		}];
	}
})

.component('privateProfileEditModal', {
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	templateUrl: 'private/partials/profile-edit-modal.html',
	controller: function(AlertService, ALERT_TYPES, BackendService) {
		this.profile = this.resolve.profile;

		this.formData = {
			email: this.profile.email,
			password: ''
		}

		this.check = {
			email: '',
			password: ''
		}

		this.loading = false;

		this.save = function(data) {
			this.loading = true;
			let sendData = {};
			if (data.email != this.profile.email) {
				sendData.email = data.email;
			}
			if (data.password != '') {
				sendData.password = data.password;
			}
			BackendService.getProfileResource().save(sendData).$promise.then(angular.bind(this, function() {
				this.loading = false;
				AlertService.newAlert({
					type: ALERT_TYPES.success,
					message: "Profile saved!"
				});
				delete sendData.password;
				this.close({$value: angular.extend({},this.profile, sendData)});
			}), angular.bind(this,function() {
				this.loading = false;
			}));
		}
	}
});
