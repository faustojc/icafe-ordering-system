<div>
    <div x-data="{ uploading: false, progress: 0 }">
        <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Image
        </div>
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <!-- Display preview image -->
                @if ($image_file)
                    <img src="{{ $image_file->temporaryUrl() }}" class="object-cover object-center rounded-lg" style="max-height: 180px" alt=""/>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 truncate">{{ $image_file->getClientOriginalName() }}</p>
                @else
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG (MAX. 800x400px 3MB)</p>
                @endif

                <div x-show="uploading" x-transition
                     class="w-full mt-2 bg-gray-200 rounded-full dark:bg-gray-700"
                >
                    <div>
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                             :style="'width: ' + progress + '%'"
                             x-text="progress + '%'"
                        >
                        </div>
                    </div>
                </div>
            </div>
            <input wire:model="image_file"
                   x-on:livewire-upload-start="uploading = true"
                   x-on:livewire-upload-finish="uploading = false; progress = 0"
                   x-on:livewire-upload-error="uploading = false"
                   x-on:livewire-upload-progress="progress = $event.detail.progress"
                   id="dropzone-file" type="file" class="hidden" size="3000" accept=".png, .jpg, .jpeg" />
        </label>
    </div>
</div>