import { State } from '../src';

describe('state', () => {
  test('base', async () => {
    class Data extends State {
      constructor() {
        super();
        this.state = {
          name: '',
          age: '',
        };
      }

      willDataUpdate(nextState) {
        expect(nextState).toEqual({
          name: 'lily',
          age: '1',
        });
      }

      async getUser() {
        await new Promise(r => setTimeout(r, 10));
        this.setState({
          name: 'lily',
          age: '1',
        });
      }

      shouldDataUpdate(nextState) {
        expect(nextState).toEqual({
          name: 'lily',
          age: '1',
        });
        return true;
      }

      didDataUpdate(prevState) {
        expect(prevState).toEqual({
          name: '',
          age: '',
        });
      }
    }

    const data = new Data();
    expect(data.state).toEqual({
      name: '',
      age: '',
    });

    await data.getUser();
  });


  test('shouldDataUpdate', () => {
    class Data extends State {
      constructor() {
        super();
        this.state = {
          name: '',
          age: '',
        };
      }

      willDataUpdate(nextState) {
        expect(nextState).toEqual({
          age: '1',
        });
      }

      getUser() {
        this.setState({
          age: '1',
        });
      }

      shouldDataUpdate(nextState) {
        expect(nextState).toEqual({
          age: '1',
        });
        return false;
      }

      didDataUpdate() {
        throw new Error('will not be called');
      }
    }

    const data = new Data();
    data.getUser();
  });
});
