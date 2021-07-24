const mutations={
  ['SAVEVUEXMAP'](state,data){
    state.vuexMap=data;
  },
  ['SAVEVSENSOR'](state,data){

    state.sensors.push(data);
    console.log(state.sensors);
  },
};
export default mutations;
