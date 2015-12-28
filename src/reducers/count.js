export default function(state = 1, action) {
  switch(action.type) {
    case "INCREASE":
      return state + 1
    default:
      return state;
  }
}
