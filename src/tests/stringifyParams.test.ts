import stringifyParams from "../api/stringifyParams";

describe("stringifyParams", () => {
  test("it converts a params object to string", () => {
    const params = {
      test1: "1",
      test2: "2",
      test3: "3",
    };

    const expected = "?test1=1&test2=2&test3=3";
    expect(stringifyParams(params)).toBe(expected);
  });
});
