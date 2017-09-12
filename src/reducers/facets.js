import * as _ from 'underscore'

export default class FacetReducers {

  static currentFacet(state = {}, action) {
    switch (action.type) {
      case 'SELECTED_FACET':
        return action.facet
      default:
        return state
    }
  }


  static selectedFacets(state = [], action) {
    switch (action.type) {
      case 'SELECTED_FACET':
        const existingFacet = _.find(state,
          (f) => {
            return f.key === action.facet.key;
          }
        );

        // unselect if existingFacet with same value
        const unselect = existingFacet && (existingFacet.value === action.facet.value);

        // doesn't exist: add it
        if (!existingFacet) {
          return [...state, action.facet]
        }

        const newSelectedFacets = _.filter(state,
          (f) => {
            return f.key !== action.facet.key;
          }
        );

        // exists, but not selected: remove it
        if (existingFacet && unselect) {
          return [...newSelectedFacets]
        }

        // otherwise, replace it
        return [...newSelectedFacets, action.facet]
      default:
        return state
    }
  }

  static facets(state = {}, action) {
    switch (action.type) {
      case 'FACETS_FETCH':
        return {...state, loading: true};
      case 'FACETS_SAVE':
        return {...state, ...action.facets.facets, loading: false};
      default:
        return state
    }
  }
}
