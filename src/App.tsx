import './App.css';

import { Button, Flex, Text } from '@radix-ui/themes';
// import { create } from 'zustand';

// interface MainState {
//   count: number;
//   increment: (by: number) => void;
// }

// const useMainStore = create<MainState>()(set => ({
//   count: 0,
//   increment: by => set(state => ({ count: state.count + by })),
// }));

function App() {
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
    </Flex>
  );
}

export default App;
