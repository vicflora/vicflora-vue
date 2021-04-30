export const state = () => ({
    auth: false,
        taxon: null,
        formattedName: null,
        searchResult: null,
        key: null
  })
  
export const mutations = {
add (state, text) {
    state.list.push({
    text,
    done: false,
    id: Date.now()
    })
},
remove (state, todo) {
    state.list = state.list.filter(item => item.id !== todo.id)
},
toggle (state, todo) {
    todo.done = !todo.done
}
}