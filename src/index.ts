import { resolve } from "path";
import fs from "fs";

// pre
const cwd = process.cwd();

const parse = (file: string) => {
  const out = {} as { [key: string]: number | string };
  String(file)
    .split("\n")
    .forEach((line) => {
      if (/=/.test(line)) {
        const [k, v] = line.split("=").map((v) => v.replace(/^"|"$/g, "").replace(/^'|'$/g, ""));
        const _v = Number(v);
        if (isNaN(_v)) {
          out[k] = v;
        } else {
          out[k] = _v;
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
