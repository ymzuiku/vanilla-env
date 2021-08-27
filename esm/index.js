import { resolve } from "path";
import fs from "fs";
const cwd = process.cwd();
const cache = {};
function trim(str, char) {
  return str.replace(new RegExp("^\\" + char + "+|\\" + char + "+$", "g"), "");
}
const parse = (file) => {
  const out = {};
  String(file)
    .split("\n")
    .forEach((line) => {
      if (/=/.test(line)) {
        const [k, v] = line.split("=");
        if (v[0] === `"`) {
          out[k] = trim(v, `"`);
        } else if (v[0] === `'`) {
          out[k] = trim(v, `'`);
        } else {
          const _v = Number(v);
          if (isNaN(_v)) {
            out[k] = v;
          } else {
            out[k] = _v;
          }
        }
      }
    });
  return out;
};
const env = {
  parse,
  setProcess: () => {
    Object.keys(cache).forEach((k) => {
      if (process.env[k] === void 0) {
        process.env[k] = cache[k];
      }
    });
    return env;
  },
  load: (name) => {
    const p = resolve(cwd, name);
    if (!fs.existsSync(p)) {
      throw Error(`[dotenv] ${name} is Not found`);
    }
    Object.keys(process.env).forEach((k) => {
      cache[k] = process.env[k];
    });
    const file = fs.readFileSync(p);
    const data = parse(String(file));
    Object.keys(data).forEach((k) => {
      env.set(k, data[k]);
    });
    return env;
  },
  set: (key, value) => {
    if (process.env[key] !== void 0) {
      return;
    }
    process.env[key] = String(value);
    cache[key] = value;
    return env;
  },
};
export { env };
