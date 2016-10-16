'use strict';

angular.module('myApp.private')

.component('private', {
	templateUrl: 'private/partials/private.html'
})

.component('privateHeader', {
  templateUrl: 'private/partials/header.html',
  controller: function(ConfigService, $rootScope) {
  	this.config = ConfigService.config;
		this.currentUser = $rootScope.currentUser;
		this.isNavCollapsed = true;
  }
})

.component('privateIndex', {
	templateUrl: 'private/partials/index.html'
})

.component('privateAlbumsPage', {
	bindings: {
		albums: '<albums'
	},
	templateUrl: 'private/partials/albums-page.html',
	controller: function(ConfigService) {
		this.config = ConfigService.config;
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
	templateUrl: 'private/partials/album-page.html'
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
	templateUrl: 'private/partials/members-page.html'
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
			email: this.profile.email,
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
				this.close({$value: angular.extend({},this.profile, sendData)});
			}), angular.bind(this,function() {
				this.loading = false;
			}));
		}
	}
});
