const ACTIONS = {
  GLOBAL_FORM_STATE_INPUT: 'GLOBAL_FORM_STATE_INPUT'
}

export const actions = ACTIONS;
/** form record **/

export function globalFormState(branch, value) {
  return {
    type: ACTIONS.GLOBAL_FORM_STATE_INPUT,
    branch,
    value
  };
}

export function persistSearchForm(value) {
  return globalFormState('search.keyword', value);
}
