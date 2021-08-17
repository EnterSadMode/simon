new Vue({
    data: () => ({
      position: 0,
      array: [],
      active: undefined,
      lvl: 0,
      break: false,
    }),
    methods: {
      handleChangeLevel(e) {
        this.lvl = Number(e.target.value);
      },
      randomInt(max) {
        return Math.round(Math.random() * max); 
      },
      pushRandomSound() {
        this.array.push(this.randomInt(3) + 1); 
      },
      sleep(ms) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, ms);
        })  // ХВАТИТ МЕНЯ УДАЛЯТЬ  ДЕЛАЮ ПАУЗУ МЕЖДУ НАЧАЛОМ ЗВУКА
      },
      getSpeed() {
        switch(this.lvl) {
          case 1:
            return 1000;
          case 2:
            return 400;
          default:
            return 1500;
        }
      },
      playSound(number) {
        switch(number) {
          case 1:
            this.$refs.soundFirstRef.currentTime = 0;
            this.$refs.soundFirstRef.play();
            break;
          case 2:
            this.$refs.soundSecondRef.currentTime = 0;
            this.$refs.soundSecondRef.play();
            break;
          case 3:
            this.$refs.soundThirdRef.currentTime = 0;
            this.$refs.soundThirdRef.play();
            break;
          case 4:
            this.$refs.soundFourthRef.currentTime = 0; 
            this.$refs.soundFourthRef.play();
            break;
        }
      },
      async playSounds() {
        this.break = false;
        for (let i = 0; i < this.array.length; i++) {
          if (this.break) {
            this.active = undefined;
            break;
          }
          this.active = this.array[i];
          this.playSound(this.active);
          await this.sleep(this.getSpeed());
          
        }
      },
      nextRound() {
        this.position = 0;
        this.pushRandomSound();
        this.playSounds();
        console.log(this.array);
      },
      handleClickNextRound() {
        if (!this.array.length) {
          this.nextRound();
        }
      },
      async handleClickButton(number) {
        this.playSound(number);
        this.break = true;
        if (this.array[this.position] === number) {
          ++this.position;
          if (this.array.length - 1 < this.position) {
            await this.sleep(1000);
            this.nextRound();
          }
          return;
        }
        alert('Ты проиграл');
        this.array = [];
        this.position = 0;
        
      }
    },
    watch: {
      async active(value) {
        if (value ) {
          await this.sleep(300),
          this.active = undefined;
        }
      }
      

    }
  }).$mount('#app');