const fs = require('fs');
const inquirer = require('inquirer');

const QUESTIONS = [
    {
      name: 'component-name',
      type: 'input',
      message: 'Component name:',
      validate: function (input) {
        if (/(?=\S*[-])([a-zA-Z-]+)$/.test(input)) return true;
        else return 'Component name can be only letters and must include at least one dash.';
      }
    }
  ];

const templatePath = `${__dirname}/templates/component`;
const componentsPath = `${__dirname}/../src/components`;

inquirer.prompt(QUESTIONS)
  .then(answers => {
    //console.log(answers);
    const componentName = answers['component-name'];

    fs.mkdirSync(`${componentsPath}/${componentName}`);

    createDirectoryContents(templatePath, componentsPath, componentName);

    // Add the import to components.js
    fs.appendFile(`${componentsPath}/../components.js`, `import './components/${componentName}/${componentName}.js';\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
});

function createDirectoryContents (templatePath, componentsPath, componentName) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8').replace(/gz-component/g, componentName);
      
      const writePath = `${componentsPath}/${componentName}/${file.replace('gz-component',componentName)}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    }
  });
}