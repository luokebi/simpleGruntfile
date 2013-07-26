/*
 * grunt-init-simpleGruntfile
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 LUO
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic Gruntfile.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, but ' +
  'you will most likely need to edit the generated Gruntfile.js file before ' +
  'running grunt. _If you run grunt after generating the Gruntfile, and ' +
  'it exits with errors, edit the file!_';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    {
      name: 'projectName',
      message: 'Project name:'
    },
    {
      name: 'version',
      message: 'Version:',
      default: '1.0.0'
    },
    {
      name: 'description',
      message: 'Description:',
    },
    {
    	name: 'repository',
    	message: 'Repository:',
    },
    {
    	name: 'homepage',
    	message: 'Homepage:',
    },
    {
    	name: 'authorName',
    	message: 'Author name:'
    },
    {
    	name: 'authorEmail',
    	message: 'Author email:'
    },
    {
      name: 'license',
      message: 'license:',
      default: 'MIT'
    }  
  ], function(err, props) {

    console.log(props);

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.projectName,
      version: props.version,
      description: props.description,
      author_name:props.authorName,
      author_email:props.authorEmail,

      repository: props.repository,
      homepage: props.homepage,

      devDependencies: {
        'grunt-contrib-jshint': '~0.1.1',
        'grunt-contrib-qunit': '~0.1.1',
        'grunt-contrib-concat': '~0.1.2',
        'grunt-contrib-uglify': '~0.1.1',
        'grunt-contrib-watch': '~0.2.0',
        'grunt-contrib-clean': '~0.4.0',
      }

    });

    // Find the first `preferred` item existing in `arr`.
    function prefer(arr, preferred) {
      for (var i = 0; i < preferred.length; i++) {
        if (arr.indexOf(preferred[i]) !== -1) {
          return preferred[i];
        }
      }
      return preferred[0];
    }

    

    // Guess at some directories, if they exist.
    var dirs = grunt.file.expand({filter: 'isDirectory'}, '*').map(function(d) { return d.slice(0, -1); });
    props.lib_dir = prefer(dirs, ['lib', 'src']);
    props.test_dir = prefer(dirs, ['test', 'tests', 'unit', 'spec']);

    // Maybe this should be extended to support more libraries. Patches welcome!
    props.jquery = grunt.file.expand({filter: 'isFile'}, '**/jquery*.js').length > 0;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // module dependencies
    var join = require("path").join;
    // empty directories will not be copied, so we need to create them manual
    grunt.file.mkdir(join(init.destpath(), 'src') );
    grunt.file.write(join(init.destpath(),'src/'+props.projectName+'.js'));


    // All done!
    done();
  });

};
