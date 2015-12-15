module.exports = function (grunt) {

	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['GruntFile.js', 'javascripts/src/*.js'],
			options: {
				reporter: require('jshint-stylish')
			}
		},
		concat: {
			app:{
				src: ['javascripts/src/*.js'].
				dest: 'javascripts/app.js'
			},
			vendor: {
				src: ['javascripts/vendor/*.js'],
				dest: 'javascripts/vendor.js'
			}
		},
		uglify: {
			app: {
				files: {
					'javascripts/app.min.js' : ['javascripts/app.js']
				}
			},
			vendor: {
				files: {
					'javascripts/vendor.min.js' : ['javascripts/vendor.js']
				}
			}
		},
		compass: {
			dist: {
				sassDir: 'scss',
				cssDir: 'stylesheets',
				environment: 'production',
				outputStyle: 'compressed'
			}
		},
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({
						browsers: ['last 2 versions']
					})
				]
			},
			dist: {
				src: 'stylesheets/**/*.css'
			}
		},
		modernizr: {
			dist: {
				"crawl": true,
				"devFile": "javascripts/modernizr-dev.js",
				"dest": "javascripts/modernizr.min.js"
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand:true,
					cwd: 'images/src',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'images/'
				}]
			}
		},
		watch: {
			css: {
				files: ['**/*.{scss,sass}'],
				tasks: ['compass', 'postcss']
			},
			js: {
				files: ['javascripts/src/*.js'],
				tasks: ['jshint', 'concat']
			},
			images: {
				files: ['images/src/**.{png,jpg,gif,svg}'],
				tasks: ['imagemin']
			}
		}
	});	
	
	grunt.registerTask('dev', ['jshint', 'concat', 'compass', 'postcss', 'imagemin', 'modernizr', 'watch']);
	grunt.registerTask('live', ['jshint', 'concat', 'compass', 'postcss', 'imagemin', 'modernizr', 'uglify', 'watch']);
	
};