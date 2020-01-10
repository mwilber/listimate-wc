module.exports={
    presets:[
        [
            "@babel/preset-env",
            {
                targets:{
                    "browsers": [">0.25%", "not op_mini all"],
                    "uglify": true,
                },
                useBuiltIns:"usage",
            }
        ]
    ]
}