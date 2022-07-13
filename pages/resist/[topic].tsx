import { useRouter } from 'next/router';
import React from 'react';

function Resist() {
  const {
    query: { topic },
  } = useRouter();
  return <div className={`h-24 bg-blue-500 p-8`}>
    <div className="-mx-8 mt-10 bg-white">
<div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
    <div className="-mt-5">
        <div className="relative">
    <img className="rounded-lg object-cover h-24 w-48 border border-gray-200 shadow-lg" src="https://images.unsplash.com/photo-1548383892-6bb1676b761b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80" />
    </div>
    </div>
    <div className="py-2">
<h1 className="text-2xl font-semibold">Welcome to the {topic} Resistance </h1>
<p>resist/{topic}</p>
    </div>
</div>
    </div>
  </div>;
}

export default Resist;
