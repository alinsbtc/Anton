// lib/api/agentApi.ts


export async function callAgentApi(payload) {
  console.log(payload)
  try {
    const res = await fetch('https://colony-deals-curtis-wma.trycloudflare.com/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: payload,
      }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }
    const response = await res.json();
    return {
      success: response.success,
      data: response.data,
      message: response.message
    };
  } catch (error) {
    console.error('Lỗi khi gọi API /api/agent:', error);
    return {
      success: false,
      data: null,
      message: "Lỗi khi gọi Agent"
    };
  }
}
