const BASE_URL = 'http://localhost:3001/api/v1/urls'

export const getUrls = async () => {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) {
      throw new Error('Failed to fetch your URLs.')
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Failed to fetch data.', error.message)
  }
}

export const postURL = async (card) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    })
    if (!res.ok) {
      throw new Error('Failed to post your data.')
    }
    const newCard = await res.json()
    return newCard
  } catch (error) {
    console.error('Error:', error.message)
  }
}
