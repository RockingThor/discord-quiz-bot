const prepareOptionArray = (incorrectAns: string[], ans: string): string[] => {
  const ansIndex = Math.floor(Math.random() * 4);
  let optionArray: string[] = [];
  for (let i = 0; i < ansIndex; i++) {
    optionArray.push(incorrectAns[i]);
  }
  optionArray.push(ans);
  for (let i = ansIndex; i < incorrectAns.length; i++) {
    optionArray.push(incorrectAns[i]);
  }
  return optionArray;
};
