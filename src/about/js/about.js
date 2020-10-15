import * as helperModule from "./script";

import "../scss/style.scss"


const foo = (name) => {
  console.log(`Hello ${name}`);
};

foo("Bob");
console.log(helperModule.greetings);
