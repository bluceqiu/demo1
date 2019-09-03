import Xl from '../lib/mvvm/MVVM'

new Xl({
    el: "#app",
    data:{
        frame: {
          name: 'xl',
          age: 18
        },
        ruok: 'yes',
        message: '<h5>马杀鸡</h5>'
    },
    computed: {
      getType(){
        return this.frame.age + " is a superman"
      }
    },
    methods: {
      refresh(e){
        this.frame.age++;
      }
    },
  });