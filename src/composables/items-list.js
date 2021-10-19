import { reactive, toRefs, watch, computed  } from 'vue'

export default function useList(items, pageSize, defaultSortName, defaultSortDir) {
  const state = reactive({
    selectedItem: null,
    filterName: '',
    sortName: defaultSortName,
    sortDir: defaultSortDir,
    pageNumber: 1,
  })
  watch(() => state.filterName, () => {
    state.pageNumber = 1;
  })
  watch(() => state.sortName, () => {
    state.pageNumber = 1;
  })
  watch(() => state.sortDir, () => {
    state.pageNumber = 1;
  })
  const sort = (s) => {
    //if s == current sort, reverse order
    if(s === state.sortName) {
      state.sortDir = state.sortDir==='asc'?'desc':'asc';
    }
    state.sortName = s;
  }
  const nextPage = () => {
    state.pageNumber++;
    state.selectedItem = null;
  }
  const prevPage = () => {
    state.pageNumber--;
    state.selectedItem = null;
  }
  const pageCount = computed(() => {
    let l = filteredItems.value.length,
    s = pageSize;
    return Math.floor(l / s);
  })
  const filteredItems = computed(() => {
    let filter = new RegExp(state.filterName, 'i')
    return items.filter(el => el.name.match(filter))
  })
  const sortedFilteredItems = computed(() => {
    return [...filteredItems.value].sort((a,b) => {
      let modifier = 1;
      if(state.sortDir === 'desc') modifier = -1;
      if(a[state.sortName] < b[state.sortName]) return -1 * modifier;
      if(a[state.sortName] > b[state.sortName]) return 1 * modifier;
      return 0;
    })
  })
  const sortedFilteredPaginatedItems = computed(() => {
    const start = (state.pageNumber-1) * pageSize,
          end = start + pageSize;

    return sortedFilteredItems.value.slice(start, end);
  })

  return {
    sort,
    nextPage,
    prevPage,
    pageCount,
    itemsNumber: sortedFilteredItems.value.length,
    sortedFilteredPaginatedItems,
    ...toRefs(state)
  }
}