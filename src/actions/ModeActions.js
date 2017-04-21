import {
  MODE_CHANGE
} from "../constants";

export function modeChange (mode){
  return {
    type: MODE_CHANGE,
    mode
  }
}