const ACTIONS = {
  GLOBAL_FORM_STATE_INPUT: 'GLOBAL_FORM_STATE_INPUT',
  START_PACKING: 'GLOBAL_START_PACKING',
  PACKING: 'GLOBAL_PACKING',
  ANNOUNCE: 'ANNOUNCE',
  ClEAR_ANNOUNCEMENT: 'ClEAR_ANNOUNCEMENT'
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

export function announce(text) {
  return  {
    type: ACTIONS.ANNOUNCE,
    text
  }
}

export function clearAnnouncement() {
  return {
    type: ACTIONS.ClEAR_ANNOUNCEMENT
  }
}

export function persistSearchForm(value) {
  return globalFormState('search.keyword', value);
}

export function startPacking() {
  return {
    type: ACTIONS.START_PACKING
  }
}

export function packing(id) {
  return {
    type: ACTIONS.PACKING,
    id
  }
}
