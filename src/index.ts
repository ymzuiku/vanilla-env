import { resolve } from "path";
import fs from "fs";

// pre
const cwd = process.cwd();

const ffff222 = "dog";

const parse = (file: string) => {
  const out = {} as { [key: string]: number | string };
  String(file)
    .split("\n")
    .forEach((line) => {
      if (/=/.test(line)) {
        const [k, v] = line.split("=");
        let _k = k.replace(/^"|"$/g, "");
        _k = _k.replace(/^'|'$/g, "");
        const _v = Number(v);
        if (isNaN(_v)) {
          out[_k] = v;
        } else {
          out[_k] = _v;
        }
      }
    });
  return out;
};

const env = {
  load: (name: string) => {
    const p = resolve(cwd, name);
    if (!fs.existsSync(p)) {
      throw Error(`[dotenv] ${name} is Not found`);
    }
    const file = fs.readFileSync(p);
    const data = parse(String(file));
    console.log(data);

    Object.keys(data).forEach((k) => {
      if (process.env[k] === undefined) {
        process.env[k] = String(data[k]);
      }
    });

    return env;
  },
  set: (key: string, value: number | string) => {
    if (process.env[key] !== undefined) {
      return;
    }
    process.env[key] = String(value);
  },
};

export { env };
