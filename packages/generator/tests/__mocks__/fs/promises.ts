interface FsMock {
    access: () => void;
    mkdir: () => void;
    rename: () => void;
    readFile: () => void;
    writeFile: () => void;
    constants: {
        [x: string]: number;
    };
}

const fs = jest.createMockFromModule<FsMock>("fs/promises");

fs.access = jest.fn();
fs.mkdir = jest.fn();
fs.rename = jest.fn();
fs.readFile = jest.fn();
fs.writeFile = jest.fn();
fs.constants = {
    R_OK: 1,
    W_OK: 2,
};

module.exports = fs;