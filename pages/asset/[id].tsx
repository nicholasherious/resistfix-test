import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import useSwr from 'swr';
import { Ripples } from '@uiball/loaders';

const fetcher = url => {
  return fetch(url).then(res => res.json());
};

export default function Asset() {
  const router = useRouter();

  const { data, error } = useSwr(
    () => (router.query.id ? `/api/asset/${router.query.id}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  const asset = data && data.asset;

  useEffect(() => {
    if (asset && asset.playback_id && asset.status === 'ready') {
      Router.push(`/v/${asset.playback_id}`);
    }
  }, [asset]);

  let errorMessage;

  if (error) {
    errorMessage = 'Error fetching api';
  }

  if (data && data.error) {
    errorMessage = data.error;
  }

  if (asset && asset.status === 'errored') {
    const message = asset.errors && asset.errors.messages[0];
    errorMessage = `Error creating this asset: ${message}`;
  }

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <div>Preparing</div>
      <div>
        {' '}
        <Ripples size={50} speed={2} color='#1F2937' />
      </div>
    </div>
  );
}
