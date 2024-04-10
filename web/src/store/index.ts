// import { getAccessorType, getterTree, mutationTree, actionTree } from 'typed-vuex';

import { atom } from 'jotai'
export type BoxConfig = {
    totalWidth:number,
	totalHeight:number,
	totalDimension:number,
	padding:number,
	colorMode:number,
    viewMode:number,
	partitionThickness:number,
    mm2pixel:number,
    fillet:number
}

export const boxConfigAtom = atom<BoxConfig>({
    totalWidth: 100,
    totalHeight: 100,
    totalDimension: 100,
    padding: 3,
    colorMode: 0,
    viewMode:0,
    partitionThickness: 2,
    mm2pixel:3,
    fillet:2,
})

export type Grid = {
    index:number,
	label:string,
	width:number,
    height:number,
	division:number,
}

export const gridAtoms = atom<Grid[]>([
    {
        index: 0,
        label: '',
        width: 100,
        height:100,
        division: 1
    }
])

export const openAIAPIKeyAtom = atom<string>('')
export const selectedColorAtom = atom<string>('')
export const screenModeAtom = atom<number>(0)
export const isDebugAtom = atom<boolean>(false)

export type ColorPalette = {
    label:string,
    primary:string,
    secondary:string,
}
export const colorPaletteAtom = atom<ColorPalette[]>([
    {
        label: 'しらたま',
        primary: '#F4EFE4',
        secondary: '#B4AFA2'
    },
    {
        label: 'ネイビー',
        primary: '#606D84',
        secondary: '#606D84'
    },
    {
        label: 'テラコッタ',
        primary: '#A06351',
        secondary: '#915646'
    }])

//update totalwidth along with length of gridAtoms
export const calculateSizeAction = atom(
    // 同じコンポーネント内でデータも扱うなら一緒にした方がimportを減らせます
    (get) => get(boxConfigAtom),
    // 非同期もOK
    
    async (get, set, pixelSize:number) => {
    
    const sumOfWidth = get(gridAtoms).reduce((acc, grid) => acc + grid.width, 0)
    const w = sumOfWidth + get(boxConfigAtom).partitionThickness*(get(gridAtoms).length +1);
    //get the max value from gridAtoms.height
    const h = Math.max(...get(gridAtoms).map(grid=>grid.height));
      set(boxConfigAtom, {
        ...get(boxConfigAtom),
        totalWidth:w,
        totalHeight:h,
        mm2pixel:pixelSize/w
        
      });
    },
  );
  