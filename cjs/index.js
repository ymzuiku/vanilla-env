var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if ((module2 && typeof module2 === "object") || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {
          get: () => module2[key],
          enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        "default",
        module2 && module2.__esModule && "default" in module2
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true },
      ),
    ),
    module2,
  );
};
__export(exports, {
  env: () => env,
});
var import_path = __toModule(require("path"));
var import_fs = __toModule(require("fs"));
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
    const p = (0, import_path.resolve)(cwd, name);
    if (!import_fs.default.existsSync(p)) {
      throw Error(`[dotenv] ${name} is Not found`);
    }
    const file = import_fs.default.readFileSync(p);
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
