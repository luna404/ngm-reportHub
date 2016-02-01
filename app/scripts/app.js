/**
 * @ngdoc overview
 * @name ngmReportHubApp
 * @description
 * # ngmReportHubApp
 *
 * Main module of the application.
 */
angular
	.module('ngmReportHub', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ngTable',
		'ngCsv',
		'ngDropzone',
		'countTo',
		'highcharts-ng',
		'leaflet-directive',
		'ngm',
		'ngm.widget.breadcrumb',
		'ngm.widget.calHeatmap',
		'ngm.widget.dropzone',
		'ngm.widget.highchart',
		'ngm.widget.html',
		'ngm.widget.iframe',
		'ngm.widget.leaflet',
		'ngm.widget.stats',
		'ngm.widget.table'
	])
	.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

		// from http://mysite.com/#/notes/1 to http://mysite.com/notes/1
		// $locationProvider.html5Mode(true);

		// app routes with access rights
		$routeProvider
			.when( '/login', {
				redirectTo: '/who/login'
			})
			.when( '/who', {
				redirectTo: '/who/dews/afghanistan/all/2015-01-01/2015-12-31'
			})			
			.when( '/who/login', {
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardLoginCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAnonymous();
					}],
				}
			})			
			.when( '/who/dews/report', {
				templateUrl: '/views/dashboard.html',
				controller: 'ReportMenuCtrl',				
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.isAuthenticated(); 
					}],
				}
			})
			.when( '/who/dews/report/:active', {
				templateUrl: '/views/dashboard.html',
				controller: 'ReportiFrameCtrl',				
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.isAuthenticated(); 
					}],
				}
			})
			.when( '/who/dews/upload', {
				templateUrl: '/views/dashboard.html',
				controller: 'UpdateDewsCtrl',				
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.isAuthenticated(); 
					}],
				}
			})
			.when( '/who/dews/:location/:disease/:start/:end', {
				reloadOnSearch: false,
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardDewsCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			.when( '/who/eha/monitoring', {
				reloadOnSearch: false,
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardEhaCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			.when( '/who/eha/monitoring/:donor', {
				reloadOnSearch: false,
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardEhaCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			.when( '/who/eha/monitoring/:donor/:organization', {
				reloadOnSearch: false,
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardEhaCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})	
			.when( '/who/eha/monitoring/:donor/:organization/:project', {
				reloadOnSearch: false,
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardEhaCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})			
			// forbidden
			.when( '/who/forbidden', {
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardForbiddenCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return !ngmAuth.isAuthenticated();
					}],
				}
			})

			/*** immap */
			.when( '/immap/login', {
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardLoginCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
							return ngmAuth.isAnonymous();
					}],
				}
			})			
			.when( '/immap/drr/flood/:province', {
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardFloodRiskCtrl',				
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return true;
					}],
				}
			})
			.when( '/immap/watchkeeper/:country/:start/:end', {
				reloadOnSearch: false,
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardWatchkeeperCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAuthenticated(); 
					}],
				}
			})				
			.when( '/immap', {
				redirectTo: '/immap/watchkeeper/kenya/2015-11-01/2015-11-30'
			})
			.when( '/immap/watchkeeper', {
				redirectTo: '/immap/watchkeeper/kenya/2015-11-01/2015-11-30'
			})			
			.when( '/immap/drr', {
				redirectTo: '/immap/drr/flood/afghanistan'
			})
			.when( '/immap/drr/flood', {
				redirectTo: '/immap/drr/flood/afghanistan'
			})
			// forbidden
			.when( '/immap/forbidden', {
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardForbiddenCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
							return !ngmAuth.isAuthenticated();
					}],
				}
			})	
			// default
			.otherwise({
				redirectTo: '/who/dews/afghanistan/all/2015-01-01/2016-01-01'
			});
	}])
	.run(['$rootScope', '$location', 'ngmAuth', function($rootScope, $location, ngmAuth) {

		// profile menu dropdown click
		$('.ngm-profile-icon').click(function(){
			// rotate icon
			$(this).toggleClass('rotate');
			// set class
    	$('.ngm-profile').toggleClass('active');
    	$('.ngm-profile-menu-content').toggleClass('active');
    	// toggle menu dropdown
			$('.ngm-profile-menu-content').slideToggle();
		});

		// when error on route update redirect
		$rootScope.$on('$routeChangeError' , function(event, current, previous, rejection) {

			// get app
			var app = current.$$route.originalPath.split('/')[1];
			
			if ( rejection === ngmAuth.UNAUTHORIZED ) {
				$location.path( '/' + app + '/login' );
			} else if ( rejection === ngmAuth.FORBIDDEN ) {
				$location.path( '/' + app + '/forbidden' );
			}

		});

	}])
  .filter('sumByKey', function() {
      return function(data, key) {
          if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
              return 0;
          }

          var sum = 0;
          for (var i = data.length - 1; i >= 0; i--) {
              sum += parseInt(data[i][key]);
          }

          return sum;
      };
  })	
	.controller('ngmReportHubCrtl', ['$scope', '$route', '$location', 'ngmAuth', 'ngmUser', function ($scope, $route, $location, ngmAuth, ngmUser) {

		// ngm object
		$scope.ngm = {

			// app name
			title: 'Welcome',

			// current route
			route: $route,

			// active dashboard placeholder
			dashboard: {
				model: {}
			},

			// page height
			height: $(window).height(),

			// dashboard footer
			footer: false,

			// left menu
			menu: {
				search: true,
				focused: false,
				query: []
			},

			// app style
			style: {
				logo: 'logo-who.png',
				home: '#/who',
				darkPrimaryColor: '#1976D2',
				defaultPrimaryColor: '#2196F3',
				lightPrimaryColor: '#BBDEFB',
				textPrimaryColor: '#FFFFFF',
				accentColor: '#009688',
				primaryTextColor: '#212121',
				secondaryTextColor: '#727272',
				dividerColor: '#B6B6B6'
			},

			// paint application
			setApplication: function(route) {

				// set app colors based on 
				switch(route){
					case 'immap':
						// set style obj
						$scope.ngm.style = {
							logo: 'logo-immap.png',
							home: '#/immap',
							darkPrimaryColor: '#DE696E',
							defaultPrimaryColor: '#EE6E73',
							lightPrimaryColor: '#EF9A9A'
						}
						break;
					case 'who':
						// set style obj
						$scope.ngm.style = {
							logo: 'logo-who.png',
							home: '#/who',
							darkPrimaryColor: '#1976D2',
							defaultPrimaryColor: '#2196F3',
							lightPrimaryColor: '#BBDEFB'
						}
						break;
					default:
						// default
						$scope.ngm.style = {
							logo: 'logo-ngm.png',
							home: '#/ngm',
							darkPrimaryColor: '#0288D1',
							defaultPrimaryColor: '#03A9F4',
							lightPrimaryColor: '#B3E5FC'
						}
				}

				// body footer
				$scope.ngm.footer = '<div>'
														+	'<div style="background: ' + $scope.ngm.style.lightPrimaryColor + '; height:20px;"></div>'
														+	'<div style="background: ' + $scope.ngm.style.defaultPrimaryColor + '; height:60px;">'
															+	'<p class="ngm-menu-footer-body">Supported by <a class="grey-text" href="http://immap.org"><b>iMMAP</b></a></p>'
															+ '<p id="ngm-report-extracted" style="display: none; color:white; font-weight:100; float:right; padding-right:20px;">' +moment(new Date()).format('DD MMM, YYYY') + '</p>'															
														+	'</div>';
													+	'</div>';

			},

			// Detect touch screen and enable scrollbar if necessary
			isTouchDevice: function () {
				try {
					document.createEvent('TouchEvent');
					return true;
				} catch (e) {
					return false;
				}
			},	

			// toggle search active
			toggleSearch: function(selector) {
				// toggle search input
				$('#nav-' + selector).slideToggle();
			},

			//
			toggleNavidationMenu: function() {
				// rotate icon
				$('.ngm-profile-icon').toggleClass('rotate');
				// set class
	    	$('.ngm-profile').toggleClass('active');
	    	$('.ngm-profile-menu-content').toggleClass('active');
	    	// toggle menu dropdown
				$('.ngm-profile-menu-content').slideToggle();
			},

			// app functions
			logout: function() {
				ngmAuth.logout();
			},

			// user
			getUserName: function() {
				if (ngmUser.get()) {
					return ngmUser.get().username;
				} else {
					return 'welcome';
				}
			},

			// user email
			getUserEmail: function() {
				if (ngmUser.get()) {
					return ngmUser.get().email;
				} else {
					return false;
				}
			}			

		};

		// nav menu
		if ($scope.ngm.isTouchDevice()) {
			$('#nav-mobile').css({ overflow: 'auto'});
		}	

		// paint application
		$scope.$on('$routeChangeStart', function(next, current) { 
			// get application
			var route = $location.$$path.split('/')[1];
			// set application
			$scope.ngm.setApplication(route);

		});

	}]);
