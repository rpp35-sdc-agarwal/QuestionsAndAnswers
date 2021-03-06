import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import {sleep} from 'k6';

export const options = {
  stages: [
    {duration: '1s', target: 1},
    {duration: '1s', target: 1},
    {duration: '1s', target: 10},
    {duration: '1s', target: 10},
    {duration: '1s', target: 100},
    {duration: '1s', target: 100},
    {duration: '1s', target: 1000},
    {duration: '1s', target: 1000}
  ]
}

export default function() {
  var baseURL = 'http://localhost:8000';


  const responses = http.batch([
    ['GET', `${baseURL}/qa/questions?product_id=1000011`, null, null],
    ['GET', `${baseURL}/qa/questions/3518952/answers`, null, null]
  ])

  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data)
  };
}

