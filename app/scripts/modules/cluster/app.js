/**
 * @ngdoc overview
 * @name ngmReportHubApp
 * @description
 * # ngmReportHubApp
 *
 * Main module of the application.
 */
angular
	.module('ngmCluster', [])
	.run( [ '$location', 'ngmUser', function ( $location, ngmUser ) {
	    // temp fsac workaround
	    if ( ngmUser.get() && 
	    	ngmUser.get().cluster_id === 'fsac' && 
	    	$location.host().indexOf('dev') > -1 ) {
	      $( '#ngm-fsac-dev-modal' ).openModal({dismissible: false});
	    }

	}])
	.config([ '$routeProvider', '$compileProvider', function ( $routeProvider, $compileProvider ) {

		// https://medium.com/swlh/improving-angular-performance-with-1-line-of-code-a1fb814a6476#.ufea9sjt1
		$compileProvider.debugInfoEnabled( false );

		// app routes with access rights
		$routeProvider
			// login
			.when( '/cluster/login', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardLoginCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAnonymous();
					}],
				}
			})
			// register
			.when( '/cluster/register', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardRegisterCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAnonymous();
					}],
				}
			})
			// reset with token
			.when( '/cluster/find/:token', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardResetCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAnonymous();
					}],
				}
			})
			// forbidden
			.when( '/cluster/forbidden', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardForbiddenCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
							return !ngmAuth.isAuthenticated();
					}],
				}
			})
			// guides
			.when( '/cluster/guides', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardGuidesMenuCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
							return ngmAuth.grantPublicAccess();
					}],
				}
			})		
			// feedback
			.when( '/cluster/guides/feedback', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardGuidesFeedbackCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
							return ngmAuth.grantPublicAccess();
					}],
				}
			})
			// screencasts
			.when( '/cluster/guides/screens', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardGuidesScreenCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
							return ngmAuth.grantPublicAccess();
					}],
				}
			})			
			// organization
			.when( '/cluster/organization', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterAppCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// project list by organization
			.when( '/cluster/organization/:organization_id', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterAppCtrl',
				resolve: {
					access: [ 'ngmAuth', function( ngmAuth ) {
						return ngmAuth.hasRole( 'ADMIN' );
					}],
				}
			})
			// stock reports
			.when( '/cluster/stocks', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterOrganizationStocksListCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// stock reports list by organization
			.when( '/cluster/stocks/:organization_id', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterOrganizationStocksListCtrl',
				resolve: {
					access: [ 'ngmAuth', function( ngmAuth ) {
						return ngmAuth.hasRole( 'ADMIN' );
					}],
				}
			})
			// stock report
			.when( '/cluster/stocks/report/:organization_id/:report_id', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterOrganizationStockReportCtrl',
				resolve: {
					access: [ 'ngmAuth', function( ngmAuth ) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// project list
			.when( '/cluster/projects', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterProjectProjectsCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// project list by organization
			.when( '/cluster/projects/:organization_id', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterProjectProjectsCtrl',
				resolve: {
					access: [ 'ngmAuth', function( ngmAuth ) {
						return ngmAuth.hasRole( 'ADMIN' );
					}],
				}
			})			
			// project summary
			.when( '/cluster/projects/summary/:project', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterProjectSummaryCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// project details
			.when( '/cluster/projects/details/:project', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterProjectDetailsCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// project reports
			.when( '/cluster/projects/report/:project', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterProjectReportsListCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// project reports
			.when( '/cluster/projects/report/:project/:report', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterProjectReportCtrl',
				resolve: {
					access: [ 'ngmAuth', function( ngmAuth ) { 
						return ngmAuth.isAuthenticated();
					}],
				}
			})			
			// project financials
			.when( '/cluster/projects/financials/:project', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ClusterProjectFinancialsCtrl',
				resolve: {
					access: [ 'ngmAuth', function( ngmAuth ) { 
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// admin
			.when( '/cluster/admin', {
				redirectTo: '/cluster/admin/emro/af/all/all/activity/' + moment().subtract( 1, 'M').startOf( 'M' ).format( 'YYYY-MM-DD' ) + '/' + moment().subtract( 1, 'M').endOf( 'M' ).format('YYYY-MM-DD')
			})
			// admin
			.when( '/cluster/admin/:adminRpcode/:admin0pcode/:cluster_id/:organization_tag/:report_type/:start/:end', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardClusterAdminCtrl',
				resolve: {
					access: [ 'ngmAuth', function( ngmAuth ) {
						// return ngmAuth.hasRole( 'ADMIN' );
						return ngmAuth.isAuthenticated();
					}],
				}
			})

			// hct dashboard 2017
			.when( '/cluster/health/hct', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardHctCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.grantPublicAccess();
					}],
				}
			})

			// cluster dashboard
			.when( '/cluster/4w', {
				redirectTo: '/cluster/4w/emro/af/all/all/all/all/all/2017-01-01/' + moment().format('YYYY-MM-DD')
			})
			// health dashboard
			.when( '/cluster/4w/:adminRpcode/:admin0pcode/:admin1pcode/:admin2pcode/:cluster_id/:organization_tag/:beneficiaries/:start/:end', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardClusterCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.grantPublicAccess();
					}],
				}
			})

			// health dashboard
			.when( '/cluster/health', {
				// redirectTo: '/cluster/health/4w/hq/all/all/all/all/all/all/2016-01-01/' + moment().format('YYYY-MM-DD')
				redirectTo: '/cluster/health/4w/hq/all/all/all/all/all/all/2016-01-01/2016-12-31'
			})
			// health dashboard
			.when( '/cluster/health/4w', {
				// redirectTo: '/cluster/health/4w/hq/all/all/all/all/all/all/2016-01-01/' + moment().format('YYYY-MM-DD')
				redirectTo: '/cluster/health/4w/hq/all/all/all/all/all/all/2016-01-01/2016-12-31'
			})
			// health dashboard
			.when( '/cluster/health/4w/:adminR/:admin0/:organization_tag/:admin1/:admin2/:project/:beneficiaries/:start/:end', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardHealthCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return ngmAuth.grantPublicAccess();
					}],
				}
			})
			// FORBIDDEN
			.when( '/cluster/forbidden', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardForbiddenCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) { 
						return !ngmAuth.isAuthenticated();
					}],
				}
			})
			// CLUSTER HOME
			.when( '/cluster', {
				redirectTo: '/cluster/organization'
			})
			// DEFAULT
			.otherwise({
				redirectTo: '/cluster/organization'
			});

	}]);
