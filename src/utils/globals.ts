class Globals {
  static #INSTANCE: Globals;
  #TOKEN_VALIDITY = 0;

  static instance = (): Globals => {
    if (!this.#INSTANCE) {
      this.#INSTANCE = new Globals();
    }
    return this.#INSTANCE;
  };

  setTokenValidity = (duration: number) => {
    this.#TOKEN_VALIDITY = duration;
  };

  getTokenValidity = (): number => {
    return this.#TOKEN_VALIDITY;
  };
}

export default Globals;
