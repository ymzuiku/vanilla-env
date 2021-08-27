import { resolve } from "path";
import fs from "fs";
const cwd = process.cwd();
const parse = (file) => {
  const out = {};
  String(file)
    .split("\n")
    .forEach((line) => {
      if (/=/.test(line)) {
        const [k, v] = line.split("=").map((v2) => v2.replace(/^"|"$/g, "").replace(/^'|'$/g, ""));
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
  load: (name) => {
    const p = resolve(cwd, name);
    if (!fs.existsSync(p)) {
      throw Error(`[dotenv] ${name} is Not found`);
    }
    const file = fs.readFileSync(p);
    const data = parse(String(file));
    Object.keys(data).forEach((k) => {
      if (process.env[k] === void 0) {
        process.env[k] = String(data[k]);
      }
    });
    return env;
  },
  set: (key, value) => {
    if (process.env[key] !== void 0) {
      return;
    }
    process.env[key] = String(value);
  },
};
export { env };
