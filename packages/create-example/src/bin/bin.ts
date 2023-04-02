#!/usr/bin/env node

import {CreateExample} from "../index";
import * as process from "process";

const createExample = new CreateExample();

createExample.Run()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });