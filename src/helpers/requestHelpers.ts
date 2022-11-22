const generateRequestsForApproval = (idsList: any[], list: any[]) => {
  const result = list.filter((item) => idsList.includes(item.id));
  return result;
};

export default { generateRequestsForApproval };
