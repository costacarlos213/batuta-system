module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    'const-enum',
    ['module-resolver', {
      alias: {
        // insert the same tsconfig.json paths
      }
    }]
  ]
}
