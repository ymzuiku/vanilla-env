import { env } from "./index";

test("load .env", () => {
  env.load(".env");
  env.set("fish", 30);
  console.log(process.env.dog);
  expect(process.env.dog).toEqual("20");
  expect(process.env.cat).toEqual("fff");
  expect(process.env.fish).toEqual("30");
});
