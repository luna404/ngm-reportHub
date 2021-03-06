/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectProjectsCtrl
 * @description
 * # ClusterProjectProjectsCtrl
 * Controller of the ngmReportHub
 */
angular.module( 'ngmReportHub' )
	.controller( 'ClusterProjectProjectsCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterHelper', function ( $scope, $location, $route, ngmAuth, ngmData, ngmUser, ngmClusterHelper ) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		// report object
		$scope.report = {

			// ngm
			ngm: $scope.$parent.ngm,

			// user
			user: ngmUser.get(),

			// form to add new project
			newProjectUrl: '#/cluster/projects/details/new',

			// placeholders
			title: '',
			subtitle: '',

			// organization
			getOrganizationHref: function() {
				var href = '#/cluster/organization';
				if ( $route.current.params.organization_id ) { href += '/' + $route.current.params.organization_id }
				return href;
			},

			// get organization
			getOrganization: function( organization_id ){

				// return http
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/getOrganization',
					data: {
						'organization_id': organization_id
					}
				}
			}

		}

		// org id
		$scope.report.organization_id =
				$route.current.params.organization_id ? $route.current.params.organization_id : ngmUser.get().organization_id;

		// org tag
		$scope.report.organization_tag =
		$route.current.params.organization_tag ? $route.current.params.organization_tag : ngmUser.get().organization_tag;

		// get data
		ngmData
			.get( $scope.report.getOrganization( $scope.report.organization_id ) )
			.then( function( organization ){
			$scope.model.header.download.downloads[0].request.data.report = organization.organization_tag  +'_projects-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' );
			// set model titles
			$scope.model.header.title.title = organization.admin0name.toUpperCase().substring(0, 3) + ' | ' + organization.cluster.toUpperCase() + ' | ' + organization.organization + ' | Projects';
			$scope.model.header.subtitle.title = organization.cluster + ' projects for ' + organization.organization + ' ' + organization.admin0name;

		});

		// report dashboard model
		$scope.model = {
			name: 'cluster_project_list',
			header: {
				div: {
					'class': 'col s12 m12 l12 report-header',
					style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
				},
				title: {
					'class': 'col s12 m9 l9 report-title',
					style: 'font-size: 3.4rem; color: ' + $scope.report.ngm.style.defaultPrimaryColor,
					title: $scope.report.title
				},
				subtitle: {
					'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
					title: $scope.report.subtitle
				},
				download: {
					'class': 'col s12 m3 l3 hide-on-small-only',
					downloads: [{
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'assignment',
						hover: 'Download Project Summaries as CSV',
						request: {
							method: 'POST',
							url: ngmAuth.LOCATION + '/api/cluster/project/getProjects',
							data: {
								details: 'projects',
								report: $scope.report.organization_tag +'_projects-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ),
								query: { organization_id: $scope.report.organization_id },
								csv:true
							}
						},
						metrics: {
							method: 'POST',
							url: ngmAuth.LOCATION + '/api/metrics/set',
							data: {
								organization: $scope.report.user.organization,
								username: $scope.report.user.username,
								email: $scope.report.user.email,
								dashboard: 'projects list',
								theme: 'organization_projects_details',
								format: 'csv',
								url: $location.$$path
							}
						}
					}]

				}
			},
			rows: [{
				columns: [{
					styleClass: 's12 m12 l12',
					widgets: [{
						type: 'html',
						card: 'white grey-text text-darken-2',
						style: 'padding: 20px;',
						config: {
							html: '<a class="btn-flat waves-effect waves-teal left hide-on-small-only" href="' + $scope.report.getOrganizationHref() + '"><i class="material-icons left">keyboard_return</i>Back to Organization</a><a class="waves-effect waves-light btn right" href="' + $scope.report.newProjectUrl + '"><i class="material-icons left">add_circle_outline</i>Add New Project</a>'
						}
					}]
				}]
			},{
				columns: [{
					styleClass: 's12 m12 l12',
					widgets: [{
						type: 'list',
						card: 'white grey-text text-darken-2',
						config: {
							titleIcon: 'alarm_on',
							// color: 'teal lighten-4',
							color: 'blue lighten-4',
							// textColor: 'white-text',
							title: 'Active',
							icon: 'edit',
							request: {
								method: 'POST',
								url: ngmAuth.LOCATION + '/api/cluster/project/getProjectsList',
								data: {
									filter: {
										organization_id: $scope.report.organization_id,
										project_status: 'active'
									}
								}
							}
						}
					}]
				}]
			},{
				columns: [{
					styleClass: 's12 m12 l12',
					widgets: [{
						type: 'list',
						card: 'white grey-text text-darken-2',
						config: {
							titleIcon: 'done_all',
							// color: 'lime lighten-4',
							color: 'blue lighten-4',
							title: 'Complete',
							icon: 'done',
							request: {
								method: 'POST',
								url: ngmAuth.LOCATION + '/api/cluster/project/getProjectsList',
								data: {
									filter: {
										organization_id: $scope.report.organization_id,
										project_status: 'complete'
									}
								}
							}
						}
					}]
				}]
			},{
				columns: [{
					styleClass: 's12 m12 l12',
					widgets: [{
						type: 'html',
						card: 'card-panel',
						style: 'padding:0px; height: 90px; padding-top:10px;',
						config: {
							html: $scope.report.ngm.footer
						}
					}]
				}]
			}]
		};

		// assign to ngm app scope
		$scope.report.ngm.dashboard.model = $scope.model;

	}]);
