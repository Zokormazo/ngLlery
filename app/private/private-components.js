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
	controller: function() {}
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
		photo: '<'
	},
	templateUrl: 'private/partials/photo-item.html'
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

.component('privateProfilePage', {
	templateUrl: 'private/partials/profile-page.html'
});
