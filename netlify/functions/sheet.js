const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const SHEET_ID = '1tmUnbXHENlO6TYXN1bmzCDRhtG1d2qENfgDQk7KdX9s';
  const API_KEY = process.env.GOOGLE_SHEET_API_KEY;

  const ranges = ['Allstar!A2:H', 'Uhlmann!A2:H'];

  // 각 시트를 fetch 요청으로 변환
  const requests = ranges.map(range => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
    return fetch(url).then(res => res.json());
  });
  
  const combinedRows = results.flatMap(result => result.values || []);

  // 병렬 처리
  const results = await Promise.all(requests);
  console.log("Google API 응답:", JSON.stringify(results, null, 2)); // 👈 이 줄 추가

  // 결과 합치기
  const combinedRows = results.flatMap(result => result.values || []);

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ values: combinedRows })
  };
};
