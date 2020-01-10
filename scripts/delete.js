const fs = require('fs');
const inquirer = require('inquirer');

const componentsPath = `${__dirname}/../src/components`;
const COMPONENTS = fs.readdirSync(componentsPath);

const QUESTIONS = [
    {
        name: 'component-to-delete',
        type: 'list',
        message: 'Which component?',
        choices: COMPONENTS
    }
  ];

inquirer.prompt(QUESTIONS)
  .then(answers => {
    //console.log(answers);
    let componentName = answers['component-to-delete'];
    deleteFolderRecursive(`${componentsPath}/${componentName}`);
    // Delete the import from the components.js file
    let contents = fs.readFileSync(`${componentsPath}/../components.js`, 'utf8');

    fs.writeFileSync(`${componentsPath}/../components.js`, contents.replace(`import './components/${componentName}/${componentName}.js';\n`,""), 'utf8');
    console.log('DELETED!');
});

function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };