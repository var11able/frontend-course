import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'campus-club-finder:joined-clubs'

function readJoinedIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

export function useJoinedClubs() {
  const [joinedIds, setJoinedIds] = useState(readJoinedIds)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(joinedIds))
    } catch {}
  }, [joinedIds])

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === STORAGE_KEY) setJoinedIds(readJoinedIds())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const isJoined = useCallback((clubId) => joinedIds.includes(clubId), [joinedIds])

  const joinClub = useCallback((clubId) => {
    setJoinedIds((ids) => (ids.includes(clubId) ? ids : [...ids, clubId]))
  }, [])

  return { isJoined, joinClub }
}
