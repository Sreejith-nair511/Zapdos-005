import { ReportData } from "./report-generator";

// System prompt for the AI
const SYSTEM_PROMPT = `You are Digital Sarpanch, an AI assistant for rural Indian communities. 
You help with various issues like agriculture, water management, power outages, education, and welfare schemes.
Always respond in a helpful, clear, and culturally appropriate manner.
If you don't know the answer to something, suggest contacting local authorities.
Keep responses concise but informative, typically 2-3 sentences.`;

/**
 * Generate AI recommendations based on report data
 * @param reportData The report data to analyze
 * @returns Array of AI-generated recommendations
 */
export async function generateAIRecommendations(reportData: ReportData): Promise<string[]> {
  try {
    // Create a summary of the report data for the AI
    const reportSummary = `
Report Title: ${reportData.title}
Timestamp: ${reportData.timestamp}
Summary: ${reportData.summary}
Metrics: ${Object.entries(reportData.metrics).map(([key, value]) => `${key}: ${value}`).join(', ')}
Alerts: ${reportData.alerts.map(alert => `${alert.message} (${alert.severity} priority at ${alert.time})`).join(', ')}
    `.trim();

    // Call the Mistral API
    const response = await fetch("/api/mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        prompt: `${SYSTEM_PROMPT}

Based on the following report data, generate 3 specific, actionable recommendations for improving the system:

${reportSummary}

Recommendations:`
      }),
    });

    if (!response.ok) {
      throw new Error(`Mistral API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    // Parse the recommendations from the response
    // Assuming the AI returns a numbered list or bullet points
    const aiResponse = data.response;
    
    // Try to extract recommendations from numbered or bulleted list
    const lines = aiResponse.split('\n').filter((line: string) => line.trim() !== '');
    const recommendations: string[] = [];
    
    for (const line of lines) {
      // Remove numbering or bullet points
      const cleanedLine = line
        .replace(/^\d+\.\s*/, '')  // Remove "1. ", "2. ", etc.
        .replace(/^[\*\-\u2022]\s*/, '')  // Remove "* ", "- ", or bullet points
        .trim();
      
      if (cleanedLine.length > 10) {  // Only add if it's a meaningful recommendation
        recommendations.push(cleanedLine);
      }
    }
    
    // If we couldn't parse specific recommendations, return the whole response as one
    if (recommendations.length === 0) {
      recommendations.push(aiResponse);
    }
    
    // Limit to 3 recommendations
    return recommendations.slice(0, 3);
  } catch (error) {
    console.error("AI recommendation generation error:", error);
    // Fallback to mock recommendations
    return [
      "Review system performance metrics regularly",
      "Optimize resource allocation based on usage patterns",
      "Schedule preventive maintenance during low-activity periods"
    ];
  }
}

/**
 * Generate an AI summary based on report data
 * @param reportData The report data to analyze
 * @returns AI-generated summary
 */
export async function generateAISummary(reportData: ReportData): Promise<string> {
  try {
    // Create a summary of the report data for the AI
    const reportSummary = `
Report Title: ${reportData.title}
Metrics: ${Object.entries(reportData.metrics).map(([key, value]) => `${key}: ${value}`).join(', ')}
Alerts: ${reportData.alerts.map(alert => `${alert.message} (${alert.severity} priority)`).join(', ')}
    `.trim();

    // Call the Mistral API
    const response = await fetch("/api/mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        prompt: `${SYSTEM_PROMPT}

Based on the following report data, generate a concise summary (2-3 sentences) of the key findings:

${reportSummary}

Summary:`
      }),
    });

    if (!response.ok) {
      throw new Error(`Mistral API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.response;
  } catch (error) {
    console.error("AI summary generation error:", error);
    // Fallback to mock summary
    return "The system is performing within normal parameters with minor issues that have been addressed. Continue monitoring for optimal performance.";
  }
}