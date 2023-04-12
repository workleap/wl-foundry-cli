#!/usr/bin/env node

import { CreateWorkleap } from "../create-workleap";
import * as process from "process";

const createExample = new CreateWorkleap();

createExample
  .Run()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
