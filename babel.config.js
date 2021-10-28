module.exports =
   process.env.TARGET == 'demo'
      ? {
           presets: ['@vue/cli-plugin-babel/preset'],
           plugins: [
              [
                 'prismjs',
                 {
                    languages: ['javascript'],
                    theme: 'default',
                    css: true
                 }
              ]
           ]
        }
      : {
           presets: ['@babel/preset-env']
        }
