import {generateClasses} from '@formkit/themes'
const config = {
    config: {
        classes: generateClasses({
            global:{
                wrapper: 'space-y-2 mb-3 mt-10',
                message: 'bg-red-200 text-red-500 font-bold uppercase text-center py-2 mb-1',
                label: 'text-white text-lg uppercase font-bold',
                input: 'w-full p-2 rounded-md placeholder-gray-400 text-gray-700'

            },  
            submit:{
                input: '$reset bg-blue-500 text-white text-center py-2 block w-full uppercase font-bold hover:bg-blue-700 transition'
            }
        })
    }
}

export default config