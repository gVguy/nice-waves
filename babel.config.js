module.exports = {
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
