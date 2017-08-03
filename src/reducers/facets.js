import * as _ from 'underscore'

export default class FacetReducers {

  static selectedFacets(state = [], action) {
    switch (action.type) {
      case 'SELECTED_FACET':
        const existingFacet = _.find(state,
          (f) => {
            return f.key === action.facet.key;
          }
        ) ;

        // unselect if existingFacet with same value
        const unselect = existingFacet && (existingFacet.values === action.facet.values) ;

        // doesn't exist: add it
        if (!existingFacet) {
          return [...state, action.facet]
        }
        const newSelectedFacets = _.filter(state,
          (f) => {
            return f.key !== action.facet.key;
          }
        ) ;
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
      case 'AGGREGATED_FACETS_SAVE':
        console.log('AGGREGATED_FACETS_SAVE facets', action);
        return {...state, ...action.facets.facets};

      case 'FACETS_SAVE':
        return {...state, ...action.facets.facets}
      default:
        return state
    }
  }

}
