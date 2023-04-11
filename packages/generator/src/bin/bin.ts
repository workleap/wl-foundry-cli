#!/usr/bin/env node

import { Cli } from "../cli";
import * as process from "process";

const cli = new Cli();

cli
  .Run()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
