import moduleTest from './moduleTest';

// This comment shouldn't be visible in production

class Webpack {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello ${this.name}!`;
  }
}

let webpack = new Webpack('webpack 4');

console.log(webpack.sayHello());
moduleTest();